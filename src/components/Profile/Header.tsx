import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';
import { useRouteLoaderData } from "react-router-dom";
import useRequestHeader from "../../hooks/useRequestHeader";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { UserProps } from "../../App";

const Header = ({ user }: { user: any }) => {
  const loggedInUser = useRouteLoaderData('root') as UserProps;
  const { isLoading, data, refetch } = useRequestHeader(user._id);
  const [request, setRequest] = useState<string>();
  const [btnReq, setBtnReq] = useState<{ msg: string, icon: any }>();
  const queryClient = useQueryClient();

  const createRequest = useMutation({
    mutationFn: (userid: string) => (
      api.users.sendRequest(userid)
    ),
    onSuccess: (data) => {
      setRequest(data._id);
      refetch();
    }
  });

  const deleteRequest = useMutation({
    mutationFn: (requestid: string) => (
      api.requests.deleteSentRequest(requestid)
    ),
    onSuccess: () => {
      setRequest(undefined);
      queryClient.refetchQueries({ queryKey: ['friends'] });
      refetch();
    }
  });

  const updateRequest = useMutation({
    mutationFn: (request: { id: string, status?: string }) => (
      api.requests.updateRequest(request.id)
    ),
    onSuccess: () => {
      refetch();
      queryClient.refetchQueries({ queryKey: ['friends'] });
    }
  })

  const updateBtnReq = () => {
    if (data && data.requestSent.status === 'pending') {
      return setBtnReq({ msg: 'Invitation sent', icon: <CheckIcon /> });
    } else if (data && data.requestSent?.status === 'accepted') {
      return setBtnReq({ msg: 'Unfriend', icon: <PersonRemoveIcon /> });
    } else if (data && data.requestReceived?.status === 'pending') {
      return setBtnReq({ msg: 'Accept invite', icon: <CheckIcon /> });
    }
    setBtnReq({ msg: 'Add Friend', icon: <PersonAddOutlinedIcon /> });
  }

  const handleRequest = () => {
    if (data?.requestSent.status === 'accepted' && request)
      return deleteRequest.mutate(request);

    if (data?.requestReceived && data?.requestReceived.status === 'pending')
      return updateRequest.mutate({ id: data.requestReceived._id });

    createRequest.mutate(user._id)
  }

  useEffect(() => {
    updateBtnReq();
    if (data && data.requestSent) {
      setRequest(data.requestSent._id);
    }
  }, [data]);

  const getFriendAmountMsg = () => {
    return (
      isLoading ?
        <Skeleton /> :
        data?.amountFriends ?
          `${data?.amountFriends} friend${data?.amountFriends !== 1 ? 's' :
            ''}` :
          'No friends yet');
  }

  return (
    <>
      <Box
        sx={{
          height: '40vh',
          backgroundColor: '#bdbdbd',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: '30px',
        }}
      >
        <Box
          sx={{
            transform: 'translateY(-25%)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Avatar
            src={user.profile_image}
            sx={{
              width: '200px',
              height: '200px',
              border: '8px solid white',
            }}
          />
          <Box>
            <Typography variant="h4"
              sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography variant="body2">
              {getFriendAmountMsg()}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '20px'
          }}
        >
          {user._id === loggedInUser._id ?
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
            >Edit Profile</Button> :
            (<>
              <LoadingButton
                variant="outlined"
                loading={isLoading}
                startIcon={btnReq?.icon}
                onClick={handleRequest}
                disabled={data && data.requestSent.status === 'pending'}
              >
                {btnReq?.msg}
              </LoadingButton>
              <Button
                variant="outlined"
                startIcon={<MessageIcon />}
              >Message</Button>
            </>)
          }
        </Box>
      </Box>
    </>
  );
}

export default Header;

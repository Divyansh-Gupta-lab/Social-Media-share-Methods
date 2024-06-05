import useApi from '../Hooks/useApi';
import { api } from '../api/api';
import { setLoading } from '../Redux/slice/loader.slice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { toastMessages } from '../Routing/Constant/tostMessages';
import { HYDRO_ONLINE_IDENTIFIER } from '../constants';

export const hydroOnlineConnect = async (
  socialProfilesObj: any,
  email: any,
  hydroOnlineStatus: any,
  setHydroOnlineStatus: any,
  socialProfileData: any,
  setSocialProfileData: any
) => {
  const { socialProfileSubscribe, hydroOnlineCheck } = api;
  const dispatch = useDispatch()
  try {
    if (!hydroOnlineStatus) {
      dispatch(setLoading(true));
      const { status } = await useApi(hydroOnlineCheck(email));
      dispatch(setLoading(false));
      if (status == 200) {
        setHydroOnlineStatus(true);
      }
    } else {
      const url = socialProfileSubscribe();
      const { status } = await useApi(url, 'post', {
        social_link: email,
        referral_rule_id: socialProfilesObj?.website,
      });
      if (status == 200) {
        setSocialProfileData(socialProfileData.concat(`${HYDRO_ONLINE_IDENTIFIER}`));
        toast.success(toastMessages.SUCCESS.HYDRO_ONLINE_CONNECTED);
      } else {
        toast.error(toastMessages.ERROR.SERVER_ERROR);
      }
    }
  } catch (error) {}
};

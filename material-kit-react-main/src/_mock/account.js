// ----------------------------------------------------------------------
const getLocalStore = localStorage.getItem('userFormToken');
const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
console.log('authorities: ', authorities);

const account = {
  displayName: `${authorities.ho} ${authorities.ten}`,
  email: authorities.email,
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;

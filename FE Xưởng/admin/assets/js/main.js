
let user = localStorage.getItem('user');
const body = document.querySelector('body');
//Chuyển user từ string sang dạng JSON.


if(user){
  user = JSON.parse(user);
  console.log(user.user);
  if(user.user.role !== 'admin'){
    body.innerHTML = 'Bạn không có quyền truy cập';
  }
}else{
  body.innerHTML = 'Bạn không có quyền truy cập';
}
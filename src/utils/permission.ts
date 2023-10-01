export function has(valueArr: number[]) {
  let isExist = false;
  // 获取用户按钮权限
  let btnPermissionsStr = Number(localStorage.getItem("role_id"));

  if (btnPermissionsStr === 0) {
    return false;
  }

  if (valueArr.includes(btnPermissionsStr)) {
    isExist = true;
  }
  return isExist;
}

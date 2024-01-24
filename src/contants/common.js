export const NAV_TAB = {
  HOME: 'home',
  CHAT: 'chat',
  CREATE: 'create',
};

export const CHAT_TYPE = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
};

export const DISPLAY_BASE64 = {
  IMAGE: 'data:image; base64, ',
  VIDEO: 'data:video; base64, ',
};

export const USER_CHAT_ACTION = {
  SEARCH_USER_CHAT: 'SEARCH_USER_CHAT',
  USER_ACTION: 'USER_ACTION',
};

export const FOLLOW = {
  FOLLOWER: 'FOLLOWER',
  FOLLOWING: 'FOLLOWING',
};

export const FOLLOW_STATUS = {
  FOLLOWED: 'yes',
  CURRENT_USER: 'you',
};

export const BASE_API = '';
export const API_LIST = {
  get_search_user: '/search',
  get_post_profile: '/profile/post',
  get_post_user_profile: 'profile/SearchPost',
  get_chat_all: '/chat/all',
  get_search_chat: '/chat/searchById',
  get_user_detail: '/UserDetail',
  get_following_user: '/followingUser',
  get_followers_user: '/followersUser',
  get_following: '/following',
  get_followers: '/followers',
  get_search_detail_user: '/searchDetail',
  get_check_messge: '/chat/checkMess',
  post_post: '/post',
  post_user: '/users',
  post_create_chat: '/chat/search',
  post_change_password: '/changePassword',
  post_like_comment: '/post/addLikeComment',
  post_dislike_comment: '/post/DeleteLikeComment',
  post_dislike_post: '/post/dislike',
  post_imgage_video: '/',
  post_detail: '/postDetail',
  post_add_following: 'users/follow',
  post_create_post: '/newPost',
  post_update_image_post: '/newImagePost',
  post_update_video_post: '/newVideoPost',
  post_add_message: '/chat/addMess',
  login: '/authenticate',
  logout: '/logout',
  register: '/register',
  home: '/home',
  put_update_user: '/user/update',
  put_update_avatar: 'user/updateAvatar',
  suggest_friend: '/suggestFriend',
  del_leave_chat: '/chat/leaveChat',
  del_unfollow: '/unFollow',
  del_post_comment: '/post/deleteComment',
  del_post: '/post',
  del_mess: '/chat/deleteMess',
};

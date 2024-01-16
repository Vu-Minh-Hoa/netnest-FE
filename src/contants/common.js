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

export const BASE_API = '';
export const API_LIST = {
  post_user: '/users',
  get_search_user: '/search',
  get_post_profile: '/profile/post',
  get_chat_all: '/chat/all',
  get_search_chat: '/chat/searchById',
  get_user_detail: '/UserDetail',
  get_search_detail_user: '/searchDetailUser',
  get_following: '/following',
  get_followers: '/followers',
  get_check_messge: '/chat/checkMess',
  post_create_chat: '/chat/search',
  post_add_comment: '/post',
  post_like_comment: '/post/addLikeComment',
  post_dislike_comment: '/post/dislike',
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
  del_leave_chat: 'chat/leaveChat',
};

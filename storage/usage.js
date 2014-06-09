// expires方法的参数是以秒为单位的，其他的方法跟localStorage的相同
// 方法有：getItem/setItem/removeItem/clear/expires

// 30秒后过期
storage.setItem("test","hello world").expires(30);

storage.setItem("test","hello world");
storage.expires(30);

// clear全部由storage创建的localStorage
storage.clear();

// getItem
storage.getItem("test");

// removeItem
storage.removeItem("test");

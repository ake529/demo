package com.sinosoft.sinoep.user.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.alibaba.dubbo.config.annotation.Service;
import com.sinosoft.sinoep.user.dao.UserDao;
import com.sinosoft.sinoep.user.model.User;

@Service(version = "1.0.0")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    /**
     * 获取所有用户列表
     * 
     * @return
     */
    @Override
    public List<User> getUserList() {
        List<User> userList = new ArrayList<User>();
        userList = userDao.findAll();
        return userList;
    }

    /**
     * 通过姓名获取用户信息
     * 
     * @param name 用户姓名
     * @return
     */
    @Override
    public User getUserByName(String name) {
        User user = new User();
        user.setUserName(name);
        //将匹配对象封装成Example对象
        Example<User> example = Example.of(user);
        return userDao.findOne(example);
    }

    /**
     * 新增用户信息
     * 
     * @param User 用户信息
     * @return
     */
    @Override
    public User addUser(User User) {
        return userDao.save(User);
    }

    /**
     * 更新用户信息
     * 
     * @param User 用户信息
     * @return
     */
    @Override
    public User updateUserById(User User) {
        return userDao.save(User);
    }

    /**
     * 删除用户信息
     * 
     * @param id 主键Id
     */
    @Override
    public void deleteUserById(String id) {
        userDao.delete(id);
    }

    /**
     * 获取最新的用户
     * 
     * @return
     */
    @Override
    public List<User> getCurrentUserList() {
        Sort sort = new Sort(Sort.Direction.DESC, "createTime");
        return userDao.findAll(sort);

    }

    /**
     * 获取分页的用户
     * 
     * @return
     */
    @Override
    public Page<User> getPageUserList() {
        Sort sort = new Sort(Sort.Direction.DESC, "createTime");
        Page<User> result = userDao.findAll(new PageRequest(0, 5, sort));
        System.out.println(result.getNumber());
        System.out.println(result.getNumberOfElements());
        System.out.println(result.getSize());
        System.out.println(result.getTotalElements());
        System.out.println(result.getTotalPages());
        return result;
    }

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see com.sinosoft.sinoep.user.api.UserService#modifyByIdAndUserId(java.lang.String, java.lang.String)
     */
    @Override
    public String modifyByIdAndUserId(String nickName, String id) {

        return userDao.modifyByIdAndUserId(nickName, id);
    }

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see com.sinosoft.sinoep.user.api.UserService#getList(java.lang.String)
     */
    @Override
    public List<Object[]> getList(String userName) {
        return userDao.getList(userName);
    }

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see com.sinosoft.sinoep.user.api.UserService#getUserList(com.sinosoft.sinoep.user.model.User)
     */
    @Override
    public Page<User> getUserList(User user) {
        Sort sort = new Sort(Sort.Direction.DESC, "createTime");
        //将匹配对象封装成Example对象
        Example<User> example = Example.of(user);
        Page<User> result = userDao.findAll(example, new PageRequest(0, 5, sort));
        return result;
    }

    public Page<User> getFindAllByPageable(User user) {
        PageRequest pageRequest = new PageRequest(0, 5, null);
        Page<User> result = userDao.findAllByPageable(pageRequest);
        return result;
    }
}
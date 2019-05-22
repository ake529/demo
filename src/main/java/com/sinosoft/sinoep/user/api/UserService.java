package com.sinosoft.sinoep.user.api;

import java.util.List;

import org.springframework.data.domain.Page;

import com.sinosoft.sinoep.user.model.User;

public interface UserService {

    List<User> getUserList();

    User getUserByName(String name);

    User addUser(User user);

    User updateUserById(User user);

    void deleteUserById(String Id);

    List<User> getCurrentUserList();

    Page<User> getPageUserList();

    Page<User> getUserList(User user);

    String modifyByIdAndUserId(String nickName, String id);

    List<Object[]> getList(String userName);

    Page<User> getFindAllByPageable(User user);

}
/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.user.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sinosoft.sinoep.user.api.UserService;
import com.sinosoft.sinoep.user.model.User;

/**
 * <B>系统名称：</B><BR>
 * <B>模块名称：</B><BR>
 * <B>中文类名：</B><BR>
 * <B>概要说明：</B><BR>
 * 
 * @author 中科软科技 kjx
 * @since 2018年9月26日
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserService userService;

    /**
     * 获取所有用户
     * 
     * @return
     */
    @GetMapping(value = "/getUserList")
    public List<User> getUserList() {
        log.debug("testwwww.debug");
        log.info("testwwww.info");
        log.error("testwwww.error");
        return userService.getUserList();
    }

    @GetMapping(value = "/getUser")
    public User getUserByName(@RequestParam("name") String name) {
        return userService.getUserByName(name);
    }

    @GetMapping(value = "/getCurrentUserList")
    public List<User> getCurrentUserList() {
        return userService.getCurrentUserList();
    }

    @GetMapping(value = "/getPageUserList")
    public Page<User> getPageUserList() {
        return userService.getPageUserList();
    }

    @GetMapping(value = "/getUserListByUser")
    public Page<User> getPagehelperUserList(@ModelAttribute("user") User user) {
        //        User user = new User();@Valid @RequestBody
        //        user.setNickName(nickName);
        System.out.println(user.getUserName());
        System.out.println(user.getDate());
        return userService.getUserList(user);
    }

    @GetMapping(value = "/getList")
    public List<Object[]> getList(@RequestParam("userName") String userName) {
        return userService.getList(userName);
    }

    @GetMapping(value = "/getFindAllByPageable")
    Page<User> getFindAllByPageable(User user) {
        return userService.getFindAllByPageable(user);
    }

    @PutMapping(value = "/addUser")
    public User addUser(User User) {
        return userService.addUser(User);
    }

    @PostMapping(value = "/updateUser")
    public User updateUser(User User) {
        return userService.updateUserById(User);
    }

    @PostMapping(value = "/deleteUser")
    public void deleteUser(@RequestParam("id") String id) {
        userService.deleteUserById(id);
    }

    /*
     * TimeZone时区，解决差8小时的问题
     * @InitBinder
     * protected void init(HttpServletRequest request, ServletRequestDataBinder binder) {
     * SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     * dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
     * binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
     * }
     */}
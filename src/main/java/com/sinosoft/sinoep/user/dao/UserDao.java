/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.user.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.sinosoft.sinoep.user.model.User;

/**
 * <B>系统名称：</B><BR>
 * <B>模块名称：</B><BR>
 * <B>中文类名：</B><BR>
 * <B>概要说明：</B><BR>
 * 
 * @author 中科软科技 kjx
 * @since 2018年6月26日
 */
public interface UserDao extends JpaRepository<User, String>, JpaSpecificationExecutor<User> {
    @Modifying
    @Query("update User u set u.nickName=?1 where u.id=?2")
    String modifyByIdAndUserId(String nickName, String id);

    @Query(value = "SELECT * FROM USER WHERE user_name like CONCAT('%',?1,'%')", nativeQuery = true)
    List<Object[]> getList(String userName);

    @Query(nativeQuery = true, value = "select * from USER ORDER BY ?#{#pageable}", countQuery = "select count(*) from USER")
    Page<User> findAllByPageable(Pageable pageable);

}

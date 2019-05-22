/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.dept.api;

import java.util.List;

import org.springframework.data.domain.Page;

import com.sinosoft.sinoep.dept.model.Dept;

/**
 * <B>系统名称：</B><BR>
 * <B>模块名称：</B><BR>
 * <B>中文类名：</B><BR>
 * <B>概要说明：</B><BR>
 * 
 * @author 中科软科技liuchao
 * @since 2018年11月8日
 */
public interface DeptService {

    List<Dept> getDeptList();

    Dept getDeptByName(String name);

    Dept addDept(Dept dept);

    Dept updateDeptById(Dept dept);

    void deleteDeptById(String Id);

    List<Dept> getCurrentDeptList();

    Page<Dept> getPageDeptList();

    Page<Dept> getDeptList(Integer page, Integer size, Dept dept);

    String modifyByIdAndDeptId(String nickName, String id);

    List<Object[]> getList(String deptName);

    Page<Dept> getFindAllByPageable(Dept dept);
}

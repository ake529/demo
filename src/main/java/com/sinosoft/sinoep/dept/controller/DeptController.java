/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.dept.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sinosoft.sinoep.dept.api.DeptService;
import com.sinosoft.sinoep.dept.model.Dept;

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
@RequestMapping(value = "/dept")
public class DeptController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private DeptService deptService;

    /**
     * 获取所有用户
     * 
     * @return
     */
    @GetMapping(value = "/getDeptList")
    public List<Dept> getDeptList() {
        log.debug("testwwww.debug");
        log.info("testwwww.info");
        log.error("testwwww.error");
        return deptService.getDeptList();
    }

    @GetMapping(value = "/getDept")
    public Dept getDeptByName(@RequestParam("name") String name) {
        return deptService.getDeptByName(name);
    }

    @GetMapping(value = "/getCurrentDeptList")
    public List<Dept> getCurrentDeptList() {
        return deptService.getCurrentDeptList();
    }

    @GetMapping(value = "/getPageDeptList")
    public Page<Dept> getPageDeptList() {
        return deptService.getPageDeptList();
    }

    @GetMapping(value = "/getDeptListByDept")
    public Page<Dept> getPagehelperDeptList(Integer page, Integer size, Dept Dept) {
        return deptService.getDeptList(page, size, Dept);
    }

    @GetMapping(value = "/getList")
    public List<Object[]> getList(@RequestParam("DeptName") String DeptName) {
        return deptService.getList(DeptName);
    }

    @GetMapping(value = "/getFindAllByPageable")
    Page<Dept> getFindAllByPageable(Dept Dept) {
        return deptService.getFindAllByPageable(Dept);
    }

    @PutMapping(value = "/addDept")
    public Dept addDept(Dept Dept) {
        return deptService.addDept(Dept);
    }

    @PostMapping(value = "/updateDept")
    public Dept updateDept(Dept Dept) {
        return deptService.updateDeptById(Dept);
    }

    @PostMapping(value = "/deleteDept")
    public void deleteDept(@RequestParam("id") String id) {
        deptService.deleteDeptById(id);
    }
}
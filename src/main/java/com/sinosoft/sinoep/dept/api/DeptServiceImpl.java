/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.dept.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.alibaba.dubbo.config.annotation.Service;
import com.sinosoft.sinoep.dept.dao.DeptDao;
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
@Service(version = "1.0.0")
public class DeptServiceImpl implements DeptService {

    @Autowired
    private DeptDao deptDao;

    /**
     * 获取所有部门列表
     * 
     * @return
     */
    @Override
    public List<Dept> getDeptList() {
        List<Dept> DeptList = new ArrayList<Dept>();
        DeptList = deptDao.findAll();
        return DeptList;
    }

    /**
     * 通过姓名获取部门信息
     * 
     * @param name 部门名
     * @return
     */
    @Override
    public Dept getDeptByName(String name) {
        Dept Dept = new Dept();
        Dept.setDeptName(name);
        //将匹配对象封装成Example对象
        Example<Dept> example = Example.of(Dept);
        return deptDao.findOne(example);
    }

    /**
     * 新增用户信息
     * 
     * @param Dept 部门信息
     * @return
     */
    @Override
    public Dept addDept(Dept Dept) {
        if (Dept.getCreateTime() == null) {
            Dept.setCreateTime(new Date());
        }
        return deptDao.save(Dept);
    }

    /**
     * 更新部门信息
     * 
     * @param Dept 部门信息
     * @return
     */
    @Override
    public Dept updateDeptById(Dept Dept) {
        return deptDao.save(Dept);
    }

    /**
     * 删除部门信息
     * 
     * @param id 主键Id
     */
    @Override
    public void deleteDeptById(String id) {
        deptDao.delete(id);
    }

    /**
     * 获取最新的部门
     * 
     * @return
     */
    @Override
    public List<Dept> getCurrentDeptList() {
        Sort sort = new Sort(Sort.Direction.DESC, "createTime");
        return deptDao.findAll(sort);

    }

    /**
     * 获取分页的部门
     * 
     * @return
     */
    @Override
    public Page<Dept> getPageDeptList() {
        Sort sort = new Sort(Sort.Direction.DESC, "createTime");
        Page<Dept> result = deptDao.findAll(new PageRequest(0, 5, sort));
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
     * @see com.sinosoft.sinoep.Dept.api.DeptService#modifyByIdAndDeptId(java.lang.String, java.lang.String)
     */
    @Override
    public String modifyByIdAndDeptId(String nickName, String id) {

        return deptDao.modifyByIdAndDeptId(nickName, id);
    }

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see com.sinosoft.sinoep.Dept.api.DeptService#getList(java.lang.String)
     */
    @Override
    public List<Object[]> getList(String DeptName) {
        return deptDao.getList(DeptName);
    }

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see com.sinosoft.sinoep.Dept.api.DeptService#getDeptList(com.sinosoft.sinoep.Dept.model.Dept)
     */
    @Override
    public Page<Dept> getDeptList(Integer page, Integer size, Dept dept) {
        Sort sort = new Sort(Sort.Direction.DESC, "createTime");
        //创建匹配器，即如何使用查询条件
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withStringMatcher(StringMatcher.CONTAINING) //改变默认字符串匹配方式：模糊查询
                .withMatcher("deptName", GenericPropertyMatchers.startsWith()) //地址采用“开始匹配”的方式查询//构建对象
                .withIgnorePaths("createTime", "date", "id", "deptlevel", "dptmAdminName",
                        "abbreviation", "deptNickName", "fromUnit", "deptnumber"); //忽略属性：是否关注。因为是基本类型，需要忽略掉  
        //将匹配对象封装成Example对象
        Example<Dept> example = Example.of(dept, matcher);
        Page<Dept> result = deptDao.findAll(example, new PageRequest(page, size, sort));
        return result;
    }

    @Override
    public Page<Dept> getFindAllByPageable(Dept Dept) {
        PageRequest pageRequest = new PageRequest(0, 5, null);
        Page<Dept> result = deptDao.findAllByPageable(pageRequest);
        return result;
    }
}

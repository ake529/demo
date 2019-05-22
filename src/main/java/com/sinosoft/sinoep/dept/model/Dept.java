/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.dept.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * <B>系统名称：</B><BR>
 * <B>模块名称：</B><BR>
 * <B>中文类名：</B><BR>
 * <B>概要说明：</B><BR>
 * 
 * @author 中科软科技liuchao
 * @since 2018年11月8日
 */
@Entity
@Table(name = "dept")
@EntityListeners(AuditingEntityListener.class)
public class Dept implements Serializable {

    /**  */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    private String deptName;

    private String deptlevel;

    private String deptNickName;

    private String dptmAdminName;

    private String abbreviation;

    private Integer fromUnit;

    private String deptnumber;
    @CreatedDate
    private Date createTime;
    @LastModifiedDate
    private Date date;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getDeptlevel() {
        return deptlevel;
    }

    public void setDeptlevel(String deptlevel) {
        this.deptlevel = deptlevel;
    }

    public String getDeptNickName() {
        return deptNickName;
    }

    public void setDeptNickName(String deptNickName) {
        this.deptNickName = deptNickName;
    }

    public String getDptmAdminName() {
        return dptmAdminName;
    }

    public void setDptmAdminName(String dptmAdminName) {
        this.dptmAdminName = dptmAdminName;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public Integer getFromUnit() {
        return fromUnit;
    }

    public void setFromUnit(Integer fromUnit) {
        this.fromUnit = fromUnit;
    }

    public String getDeptnumber() {
        return deptnumber;
    }

    public void setDeptnumber(String deptnumber) {
        this.deptnumber = deptnumber;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}

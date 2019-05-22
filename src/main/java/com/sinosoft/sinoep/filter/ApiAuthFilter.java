/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

import org.springframework.core.annotation.Order;

/**
 * <B>系统名称：</B><BR>
 * <B>模块名称：</B><BR>
 * <B>中文类名：</B><BR>
 * <B>概要说明：API认证filter</B><BR>
 * 
 * @author 中科软科技 kjx
 * @since 2018年10月11日
 */
@Order(1)
@WebFilter(filterName = "apiAuthFilter", urlPatterns = { "/api/*", "/user/*" })
public class ApiAuthFilter implements Filter {
    private String APP_ID = "appId";
    private String APP_KEY = "appKey";

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see javax.servlet.Filter#destroy()
     */
    @Override
    public void destroy() {
        // TODO Auto-generated method stub

    }

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse,
     *      javax.servlet.FilterChain)
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException,
            ServletException {
        String appId = servletRequest.getParameter(APP_ID);
        String appKey = servletRequest.getParameter(APP_KEY);
        if ("123".equals(appId) && "key123".equals(appKey)) {
            filterChain.doFilter(servletRequest, servletResponse);
        }
        else {
            PrintWriter out = servletResponse.getWriter();
            out.print("{\"status\":-1,\"msg\":\"appId or appKey error!\"}");
        }

    }

    /**
     * <B>方法名称：</B><BR>
     * <B>概要说明：</B><BR>
     * 
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     */
    @Override
    public void init(FilterConfig arg0) throws ServletException {
        // TODO Auto-generated method stub

    }

}

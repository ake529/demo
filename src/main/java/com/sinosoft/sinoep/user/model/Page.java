/**
 * Copyright 2018 SinoSoft. All Rights Reserved.
 */
package com.sinosoft.sinoep.user.model;

import java.io.Serializable;

/**
 * <B>系统名称：</B><BR>
 * <B>模块名称：</B><BR>
 * <B>中文类名：</B><BR>
 * <B>概要说明：</B><BR>
 * @author 中科软科技  kjx
 * @since 2018年10月25日
 */
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Slice;

/**
 * A page is a sublist of a list of objects. It allows gain information about the position of it in the containing
 * entire list.
 * 
 * @param <T>
 * @author Oliver Gierke
 */
public interface Page<T> extends Slice<T>, Serializable {

    /**
     * Returns the number of total pages.
     * 
     * @return the number of total pages
     */
    int getTotalPages();

    /**
     * Returns the total amount of elements.
     * 
     * @return the total amount of elements
     */
    long getTotalElements();

    /**
     * Returns a new {@link Page} with the content of the current one mapped by the given {@link Converter}.
     * 
     * @param converter must not be {@literal null}.
     * @return a new {@link Page} with the content of the current one mapped by the given {@link Converter}.
     * @since 1.10
     */
    @Override
    <S> Page<S> map(Converter<? super T, ? extends S> converter);
}

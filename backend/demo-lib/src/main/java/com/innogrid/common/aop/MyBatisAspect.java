package com.innogrid.common.aop;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.innogrid.common.model.BaseVO;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import java.util.Map;

@Aspect
@Component
public class MyBatisAspect {

    @Pointcut("execution(* com.innogrid..*Mapper.*(*, *))")
    public void selectMapperPointcut() {
        // Method is empty as this is just a Pointcut, the implementations are in the advices.
    }

    @Around("selectMapperPointcut()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] arg = joinPoint.getArgs();

        PageBounds pageBounds = new PageBounds();
        int page = 1;
        int itemInPage = 10;

        if(arg[0] instanceof Map) {
            Map<String, Object> map = (Map<String, Object>) arg[0];

            if(map.get("page") instanceof Integer nPage && nPage > 1) {
                page = nPage;
            }
            if(map.get("itemInPage") instanceof Integer nItemInPage && nItemInPage > 0) {
                itemInPage = nItemInPage;
            }
        } else if(arg[0] instanceof BaseVO) {
            BaseVO vo = (BaseVO) arg[0];

            if(!ObjectUtils.isEmpty(vo.getPage()) && vo.getPage() > 1) {
                page = vo.getPage();
            }
            if(!ObjectUtils.isEmpty(vo.getItemInPage()) && vo.getItemInPage() > 0) {
                itemInPage = vo.getItemInPage();
            }
        }

        pageBounds.setPage(page);
        pageBounds.setLimit(itemInPage);
        pageBounds.setAsyncTotalCount(false);
        pageBounds.setContainsTotalCount(false);

        arg[1] = pageBounds;

        return joinPoint.proceed(arg);
    }
}

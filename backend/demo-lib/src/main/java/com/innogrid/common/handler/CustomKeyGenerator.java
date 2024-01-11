package com.innogrid.common.handler;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cache.interceptor.SimpleKeyGenerator;

import java.lang.reflect.Method;

/**
 * 모든 메서드 마다 중복을 고려하여 작성하기 싫을땐 keyGenerator를 쓴다.
 */
public class CustomKeyGenerator implements KeyGenerator {
    @Override
    public Object generate(Object target, Method method, Object... params) {
        return method.getName() +
                SimpleKeyGenerator.generateKey(params);
    }
}

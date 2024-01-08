package com.innogrid.common.exceptions;

import lombok.Getter;


@Getter
public class CustomErrorException extends RuntimeException {
    private final int errorCode = 888;

    public CustomErrorException() {
        super("사용자 정의 에러가 발생하였습니다.");
    }

    public CustomErrorException(String message) {
        super(message);
    }
}

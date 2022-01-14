package com.wewaa.backend.commons.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class ApiResponseUtill<T> {

    private final static int SUCCESS = 200;
    private final static int NOT_FOUND = 400;
    private final static int FAILED = 500;
    private final static String SUCCESS_MESSAGE = "SUCCESS";
    private final static String NOT_FOUND_MESSAGE = "NOT FOUND";
    private final static String FAILED_MESSAGE = "서버에서 오류가 발생하였습니다.";
    private final static String INVALID_ACCESS_TOKEN = "Invalid access token.";
    private final static String INVALID_REFRESH_TOKEN = "Invalid refresh token.";
    private final static String NOT_EXPIRED_TOKEN_YET = "Not expired token yet.";

    private final ApiResponseHeader header;
    private final Map<String, T> body;

    public static <T> ApiResponseUtill<T> success(String name, T body) {
        Map<String, T> map = new HashMap<>();
        map.put(name, body);

        return new ApiResponseUtill(new ApiResponseHeader(SUCCESS, SUCCESS_MESSAGE), map);
    }

    public static <T> ApiResponseUtill<T> fail() {
        return new ApiResponseUtill(new ApiResponseHeader(FAILED, FAILED_MESSAGE), null);
    }

    public static <T> ApiResponseUtill<T> invalidAccessToken() {
        return new ApiResponseUtill(new ApiResponseHeader(FAILED, INVALID_ACCESS_TOKEN), null);
    }

    public static <T> ApiResponseUtill<T> invalidRefreshToken() {
        return new ApiResponseUtill(new ApiResponseHeader(FAILED, INVALID_REFRESH_TOKEN), null);
    }

    public static <T> ApiResponseUtill<T> notExpiredTokenYet() {
        return new ApiResponseUtill(new ApiResponseHeader(FAILED, NOT_EXPIRED_TOKEN_YET), null);
    }
}

package com.innogrid.common.model;

import lombok.*;

@ToString
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RedisTestVO {
    private String key;
    private Object value;
    private long ttl;
}

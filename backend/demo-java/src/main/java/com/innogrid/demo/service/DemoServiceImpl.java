package com.innogrid.demo.service;

import com.innogrid.common.exceptions.CustomErrorException;
import com.innogrid.common.model.RedisTestVO;
import com.innogrid.demo.mapper.BatchJobInfoMapper;
import com.innogrid.demo.model.BatchJobInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class DemoServiceImpl implements DemoService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final BatchJobInfoMapper batchJobInfoMapper;

    @Value("${spring.profiles.active:local}")
    private String activeProfile;

    public void redisSample(RedisTestVO dto) {
        redisTemplate.opsForValue().set(dto.getKey(), dto.getValue(), Duration.ofSeconds(dto.getTtl()));
    }

    /**
     * RedisConfig의 default redis설정(prefix, ttl 등)
     *
     * @param dto
     * @return
     */
    @Cacheable(value = "cacheTest", key="#dto.key")
    public Map<String, Object> redisCacheDemo1(RedisTestVO dto) {
        try {
            Thread.sleep(5000);
            return Map.of(dto.getKey(), dto.getValue());
        } catch (InterruptedException e) {
            throw new CustomErrorException(e.getMessage());
        }
    }

    /**
     * RedisConfig의 default redis설정(prefix, ttl 등)@Primary
     *     @Bean(name = "defaultCacheConfiguration")
     *     public RedisCacheConfiguration defaultCacheConfiguration(ObjectMapper objectMapper
     *          public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer()에서 정의된 redis 설정 (prefix, ttl)을 본다.
     *
     * @param dto
     * @return
     */
    @Cacheable(value = "cacheTest2", key="#dto.key")
    public Map<String, Object> redisCacheDemo2(RedisTestVO dto) {
        try {
            Thread.sleep(5000);
            return Map.of(dto.getKey(), dto.getValue());
        } catch (InterruptedException e) {
            throw new CustomErrorException(e.getMessage());
        }
    }

    /**
     * keyGenerator 사용
     *
     * @param dto
     * @return
     */
    @Cacheable(value = "cacheTest3")
    public Map<String, Object> redisCacheDemo3(RedisTestVO dto) {
        try {
            Thread.sleep(5000);
            return Map.of(dto.getKey(), dto.getValue());
        } catch (InterruptedException e) {
            throw new CustomErrorException(e.getMessage());
        }
    }

    public void deleteRedisCacheDemo(String pk) {
        redisTemplate.delete("%s::cacheTest::%s".formatted(activeProfile, pk));
    }

    public List<BatchJobInfo> selectBatchJobInfoList(BatchJobInfo vo) {
        return batchJobInfoMapper.selectBatchJobInfo(vo, null);
    }

    public List<Map<String, Object>> selectBatchJobMapList(Map<String, Object> map) {
        return batchJobInfoMapper.selectBatchJobMapList(map, null);
    }
}

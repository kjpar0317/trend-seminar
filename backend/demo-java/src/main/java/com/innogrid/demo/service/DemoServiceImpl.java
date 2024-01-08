package com.innogrid.demo.service;

import com.innogrid.common.exceptions.CustomErrorException;
import com.innogrid.common.model.RedisTestVO;
import com.innogrid.demo.mapper.BatchJobInfoMapper;
import com.innogrid.demo.model.BatchJobInfo;
import lombok.RequiredArgsConstructor;
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

    public void redisSample(RedisTestVO dto) {
        redisTemplate.opsForValue().set(dto.getKey(), dto.getValue(), Duration.ofSeconds(dto.getTtl()));
    }

    @Cacheable(value = "cacheTest", key="#dto.key")
    public Map<String, Object> redisCacheDemo1(RedisTestVO dto) {
        try {
            Thread.sleep(5000);
            return Map.of(dto.getKey(), dto.getValue());
        } catch (InterruptedException e) {
            throw new CustomErrorException(e.getMessage());
        }
    }

    @Cacheable(value = "cacheTest2", key="#dto.key")
    public Map<String, Object> redisCacheDemo2(RedisTestVO dto) {
        try {
            Thread.sleep(5000);
            return Map.of(dto.getKey(), dto.getValue());
        } catch (InterruptedException e) {
            throw new CustomErrorException(e.getMessage());
        }
    }

    public void deleteRedisCacheDemo(String pk) {
        redisTemplate.delete("local::cacheTest::%s".formatted(pk));
    }

    public List<BatchJobInfo> selectBatchJobInfoList(BatchJobInfo vo) {
        return batchJobInfoMapper.selectBatchJobInfo(vo, null);
    }

    public List<Map<String, Object>> selectBatchJobMapList(Map<String, Object> map) {
        return batchJobInfoMapper.selectBatchJobMapList(map, null);
    }
}

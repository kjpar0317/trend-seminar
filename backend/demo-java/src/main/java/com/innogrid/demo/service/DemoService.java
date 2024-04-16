package com.innogrid.demo.service;

import com.innogrid.common.model.RedisTestVO;
import com.innogrid.demo.model.BatchJobInfo;

import java.util.List;
import java.util.Map;

public interface DemoService {
    void redisSample(RedisTestVO dto);
    Map<String, Object> redisCacheDemo1(RedisTestVO pk);
    Map<String, Object> redisCacheDemo2(RedisTestVO dto);
    Map<String, Object> redisCacheDemo3(RedisTestVO dto);
    void deleteRedisCacheDemo(String pk);
    List<BatchJobInfo> selectBatchJobInfoList(BatchJobInfo vo);
    List<Map<String, Object>> selectBatchJobMapList(Map<String, Object> map);
    void testVirtualThread() throws InterruptedException;
}

package com.innogrid.demo.mapper;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.innogrid.demo.model.BatchJobInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BatchJobInfoMapper {
    List<BatchJobInfo> selectBatchJobInfo(BatchJobInfo batchJobInfo, PageBounds pageBounds);
    List<Map<String, Object>> selectBatchJobMapList(Map<String, Object> map, PageBounds pageBounds);
}

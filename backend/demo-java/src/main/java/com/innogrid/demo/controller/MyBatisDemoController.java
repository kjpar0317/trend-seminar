package com.innogrid.demo.controller;

import com.innogrid.demo.model.BatchJobInfo;
import com.innogrid.demo.service.DemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/mybatis")
public class MyBatisDemoController {
    private final DemoService demoService;

    @PostMapping("/test1")
    public @ResponseBody List<BatchJobInfo> test1(@RequestBody BatchJobInfo vo) {
        return demoService.selectBatchJobInfoList(vo);
    }

    @PostMapping("/test2")
    public @ResponseBody List<Map<String, Object>> test2(@RequestBody Map<String, Object> map) {
        return demoService.selectBatchJobMapList(map);
    }
}

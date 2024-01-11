package com.innogrid.demo.controller;

import com.innogrid.demo.service.DemoService;
import com.innogrid.common.model.RedisTestVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/redis")
public class RedisDemoController {
    private final DemoService demoService;

    @PostMapping
    public @ResponseBody String redis(@RequestBody RedisTestVO dto) {
        demoService.redisSample(dto);
        return "OK";
    }

    @GetMapping(value = "/cache/{pk}")
    public @ResponseBody Map<String, Object> cache(@PathVariable String pk) {
        return demoService.redisCacheDemo1(RedisTestVO.builder().key(pk).value("test").build());
    }

    @GetMapping(value = "/cache2/{pk}")
    public @ResponseBody Map<String, Object> cache2(@PathVariable String pk) {
        return demoService.redisCacheDemo2(RedisTestVO.builder().key(pk).value("test").build());
    }

    @DeleteMapping(value = "/cache/{pk}")
    public @ResponseBody String deleteCache(@PathVariable String pk) {
        demoService.deleteRedisCacheDemo(pk);
        return "OK";
    }
}

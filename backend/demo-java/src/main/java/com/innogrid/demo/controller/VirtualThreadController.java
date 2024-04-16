package com.innogrid.demo.controller;

import com.innogrid.demo.service.DemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/redis")
public class VirtualThreadController {
    private DemoService demoService;

    @GetMapping
    public @ResponseBody String test() throws InterruptedException {
        demoService.testVirtualThread();
        return "OK";
    }
}

package com.innogrid.demo.controller;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.IntStream;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/demo")
public class JavaDemoController {
    private final static int LOOP_COUNT = 10000000;
    private List<Integer> testList;

    @PostConstruct
    public void init() {
        testList = IntStream.rangeClosed(0, LOOP_COUNT).boxed().toList();
    }

    @GetMapping("/test1")
    public @ResponseBody String test1() {
        StopWatch watch = new StopWatch();

        watch.start();

        for(int i = 0; i < testList.size(); i++) {
            if(i % 10 == 0) {
                log.info("print {}", i);
            }
        }

        watch.stop();
        return watch.prettyPrint();
    }

    @GetMapping("/test2")
    public @ResponseBody String test2() {
        StopWatch watch = new StopWatch();

        watch.start();

        testList.stream()
                .filter(f -> f % 10 == 0)
                .forEach(f -> log.info("print {}", f));

        watch.stop();

        return watch.prettyPrint();
    }

}

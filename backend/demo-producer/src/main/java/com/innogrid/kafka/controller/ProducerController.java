package com.innogrid.kafka.controller;

import com.innogrid.common.model.KafkaTestVO;
import com.innogrid.kafka.service.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/producer")
public class ProducerController {
    private final ProducerService producerService;

    @PostMapping
    public @ResponseBody String test(@RequestBody KafkaTestVO vo) {
        producerService.kafkaTest1(vo);
        return "OK";
    }
}

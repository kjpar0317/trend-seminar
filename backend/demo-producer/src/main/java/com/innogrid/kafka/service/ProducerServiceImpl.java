package com.innogrid.kafka.service;

import com.innogrid.common.model.KafkaTestVO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProducerServiceImpl implements ProducerService {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Transactional
    public void kafkaTest1(KafkaTestVO vo) {
        kafkaTemplate.send("test-topic", vo);
    }
}

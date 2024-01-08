package com.innogrid.demo.model;

import com.innogrid.common.model.BaseVO;
import lombok.*;

import java.util.Date;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BatchJobInfo extends BaseVO {
    private String jobId;
	private String jobName;
	private String jobDescription;
	private String cronExpression;
	private String useYn;
	private String autoYn;
	private String regId;
	private Date regDate;
	private String updateId;
	private Date updateDate;
}

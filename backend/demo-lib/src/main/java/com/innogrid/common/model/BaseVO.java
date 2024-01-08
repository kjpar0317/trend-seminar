package com.innogrid.common.model;

import com.innogrid.common.model.aggrid.FilterModelItem;
import com.innogrid.common.model.aggrid.SortModelItem;
import lombok.*;

import java.util.List;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseVO {
    private Integer page;
    private Integer itemInPage;
    private List<FilterModelItem> filters;
    private List<SortModelItem> orderBy;
}
package com.innogrid.common.model.aggrid;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilterModelItem {
    private String type;
    private String filterType;
    private Object filter;
    private String dateFrom;
    private String dateTo;
}
package com.basic.crudapp.web;
import com.basic.crudapp.domain.Record;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RooWebJson(jsonObject = Record.class)
@Controller
@RequestMapping("records")
public class RecordController {
}

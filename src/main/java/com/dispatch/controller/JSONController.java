package com.dispatch.controller;

import com.dispatch.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class JSONController {

    @RequestMapping("/test")
    @ResponseBody
    public String test() {
        return "123";
    }


    @RequestMapping("/testMap")
    @ResponseBody
    public Map test2(@RequestParam("name") String name) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        map.put("test", 123);
        map.put("array", new String[]{"a", "b", "c"});
        return map;
    }
}

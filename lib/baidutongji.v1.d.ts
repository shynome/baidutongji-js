export default 'es6'
declare global {
  namespace baidutongji_v1 {
    interface base_params {
      /**站点id */
      site_id: number 
      // /**通常对应要查询的报告 */
      // method: string
      // /**自定义指标选择，多个指标用逗号分隔 */
      // metrics: string
      /**查询起始时间,例：20160501 */
      start_date: string
      /**查询结束时间,例：20160531 */
      end_date: string
      /**	对比查询起始时间 */
      start_date2?: string
      /**对比查询结束时间 */
      end_date2?: string
      /**时间粒度(只支持有该参数的报告): day/hour/week/month */
      gran?: 'day'|'hour'|'week'|'month'
      /**指标排序，示例：visitor_count,desc */
      order?: string
      /**获取数据偏移，用于分页；默认是0 */
      start_index?: number
      /**单次获取数据条数，用于分页；默认是20; 0表示获取所有数据 */
      max_results?: number
    }
    interface filter_params {
      /**
       * 转化目标：
       * - 1：全部页面目标
       * - 2：全部事件目标
       * - 3：时长目标
       * - 4：访问页数目标
       */
      target: 1|2|3|4
      /**
       * 来源过滤：
       * - through：直接访问
       * - search,0：搜索引擎全部
       * - link：外部链接
       */
      source: 'through'|'search,0'|'link'
      /**
       * 设备过滤
       * - pc：计算机
       * - mobile：移动设备
       */
      clientDevice: 'pc'|'mobile'
      /**
       * 地域过滤
       * - china：全国
       * - province,1：省市自治区北京
       * - province,2：省市自治区上海
       * - province,3：省市自治区天津
       * - …
       * - other：其他
       */
      area: string
      /**
       * 访客过滤
       * - new：新访客
       * - old：老访客
       */
      visitor: 'new'|'old'
    }
    type source_common = {
      /** 浏览量(PV) */
      'pv_count': 1
      /** 浏览量占比，% */
      'pv_ratio': 1
      /** 访问次数 */
      'visit_count': 1
      /** 访客数viewType:type(按来源类型)/site(按来源网站) */
      'visitor_count': 1
      /** visitor(UV) */
      'clientDevice': 1
      /** 新访客数 */
      'new_visitor_count': 1
      /** 新访客比率，% */
      'new_visitor_ratio': 1
      /** IP数 */
      'ip_count': 1
      /** 跳出率，% */
      'bounce_ratio': 1
      /** 平均访问时长，秒 */
      'avg_visit_time': 1
      /** 平均访问页数 */
      'avg_visit_pages': 1
      /** 转化次数 */
      'trans_count': 1
      /** 转化率，% */
      'trans_ratio': 1
    }
    type report_params = {
      /**
       * 趋势数据
       * 单选：
       * - `pv_count` (浏览量(PV))
       * - `visitor_count`(访客数(UV))
       * - `ip_count`(IP数)
       * - `bounce_ratio`(跳出率，%)
       * - `avg_visit_time`(平均访问时长，秒)
       * - `trans_count`(转化次无数)
       * - `contri_pv`(百度推荐贡献浏览量)
       */
      'overview/getTimeTrendRpt': 'pv_count'|'visitor_count'|'ip_count'|'bounce_ratio'|'avg_visit_time'|'trans_count'|'contri_pv'
      /**
       * 地域分布
       * - `pv_count` 浏览量(PV)
       */
      'overview/getDistrictRpt': 'pv_count'
      /**
       * 来源网站、搜索词、入口页面、受访页面
       * - `pv_count` 浏览量(PV)
       */
      'overview/getCommonTrackRpt': 'pv_count'
      /**
       * 推广方式
       * - `show_count` (展现量)
       * - `clk_count` (点击量)
       * - `cost_count` (消费，元)
       * - `ctr` (点击率，%)
       * - `cpm` (平均点击价格，元)
       * - `pv_count` (浏览量(PV))
       * - `visit_count` (访问次数)
       * - `visitor_count` (访客数(UV))
       * - `new_visitor_count` (新访客数)
       * - `new_visitor_ratio` (新访客比率，%)
       * - `in_visit_count` (页头访问次数)
       * - `bounce_ratio` (跳出率，%)
       * - `avg_visit_time` (平均访问时长，秒)
       * - `avg_visit_pages` (平均访问页数)
       * - `arrival_ratio` (抵达率)
       */
      'pro/product/a': Partial<{
        /** (展现量) */
        show_count: 1
        /** (点击量) */
        clk_count: 1
        /** (消费，元) */
        cost_count: 1
        /** (点击率，%) */
        ctr: 1
        /** (平均点击价格，元) */
        cpm: 1
        /** (浏览量(PV)) */
        pv_count: 1
        /** (访问次数) */
        visit_count: 1
        /** (访客数(UV)) */
        visitor_count: 1
        /** (新访客数) */
        new_visitor_count: 1
        /** (新访客比率，%) */
        new_visitor_ratio: 1
        /** (页头访问次数) */
        in_visit_count: 1
        /** (跳出率，%) */
        bounce_ratio: 1
        /** (平均访问时长，秒) */
        avg_visit_time: 1
        /** (平均访问页数) */
        avg_visit_pages: 1
      } & { 'flag:product':1, area:1 }>
      /**
       * 趋势分析
       * - `pv_count` (浏览量(PV))
       * - `pv_ratio` (浏览量占比，%)
       * - `visit_count` (访问次数)
       * - `visitor_count` (访客数(UV))
       * - `new_visitor_count` (新访客数)
       * - `new_visitor_ratio` (新访客比率，%)
       * - `visitorip_count` (IP数)
       * - `bounce_ratio` (跳出率，%)
       * - `avg_visit_time` (平均访问时长，秒)
       * - `avg_visit_pages` (平均访问页数)
       * - `trans_count` (转化次数)
       * - `trans_ratio` (转化率，%)
       * - `avg_trans_cost` (平均转化成本，元)
       * - `income`  (收益，元)
       * - `profit`  (利润，元)
       * - `roi` (投资回报率，%)
       */
      "trend/time/a": Partial<{
        /** 浏览量(PV)*/
        'pv_count': 1
        /** 浏览量占比，%*/
        'pv_ratio': 1
        /** 访问次数*/
        'visit_count': 1
        /** 访客数(UV)*/
        'visitor_count': 1
        /** 新访客数*/
        'new_visitor_count': 1
        /** 新访客比率，%*/
        'new_visitor_ratio': 1
        /** IP数*/
        'visitorip_count': 1
        /** 跳出率，%*/
        'bounce_ratio': 1
        /** 平均访问时长，秒*/
        'avg_visit_time': 1
        /** 平均访问页数*/
        'avg_visit_pages': 1
        /** 转化次数*/
        'trans_count': 1
        /** 转化率，%*/
        'trans_ratio': 1
        /** 平均转化成本，元*/
        'avg_trans_cost': 1
        /** (收益，元*/
        'income': 1
        /** (利润，元*/
        'profit': 1
        /** 投资回报率，%*/
        'roi': 1
      } & { source:1, clientDevice:1, area:1, visitor:1 }>
      /**
       * 百度推广趋势
       */
      'pro/hour/a':Partial<{
        /** 浏览量(PV) */
        'pv_count': 1
        /** 浏览量占比，% */
        'pv_ratio': 1
        /** 访问次数 */
        'visit_count': 1
        /** 访客数(UV) */
        'visitor_count': 1
        /** 新访客数 */
        'new_visitor_count': 1
        /** 新访客比率，% */
        'new_visitor_ratio': 1
        /** IP数 */
        'ip_count': 1
        /** 跳出率，% */
        'bounce_ratio': 1
        /** 平均访问时长，秒 */
        'avg_visit_time': 1
        /** 平均访问页数 */
        'avg_visit_pages': 1
        /** 转化次数 */
        'trans_count': 1
        /** 转化率，% */
        'trans_ratio': 1
        /** 平均转化成本，元 */
        'avg_trans_cost': 1
        /** (收益，元 */
        'income': 1
        /** (利润，元 */
        'profit': 1
        /** 投资回报率，% */
        'roi': 1
      }>
      /**
       * 全部来源
       */
      'source/all/a':Partial<source_common&{
        'clientDevice':1,
        'visitor': 1,
        /**按来源类型 */
        'viewType:type': 1
        /**按来源网站 */
        'viewType:site': 1
      }>
      /**
       * 搜索引擎
       */
      'source/engine/a':Partial<source_common&{ 'clientDevice': 1, 'area': 1, 'visitor': 1 }>
      /**
       * 搜索词
       */
      'source/searchword/a': Partial<source_common&{ 'source': 1, 'clientDevice': 1, 'visitor': 1 }>
      /**
       * 外部链接	
       */
      'source/link/a': Partial<source_common&{
        /**按域名 */
        'viewType:domain':1,
        /**按URL */
        'viewType:url':1,
        /**社会化媒体 */
        'domainType:1': 1
        /**导航网站 */
        'domainType:2': 1
        /**电子邮箱 */
        'domainType:4': 1
        'clientDevice': 1,
        'visitor': 1 
      }>
      /**
       * 受访页面	
       */
      'visit/toppage/a': Partial<{
        /**浏览量(PV) */
        'pv_count': 1
        /**访客数(UV) */
        'visitor_count': 1
        /**IP数 */
        'ip_count': 1
        /**入口页次数 */
        'visit1_count': 1
        /**贡献下游浏览量 */
        'outward_count': 1
        /**退出页次数 */
        'exit_count': 1
        /**平均停留时长，秒 */
        'average_stay_time': 1
        /**退出率，% */
        'exit_ratio': 1
      } & {
        source: 1
        visitor: 1
      }>
      /**
       * 入口页面	
       */
      'visit/landingpage/a': Partial<{
        /**访问次数 */
        'visit_count': 1
        /**访客数(UV) */
        'visitor_count': 1
        /**新访客数 */
        'new_visitor_count': 1
        /**新无访客比率，% */
        'new_visitor_ratio': 1
        /**IP数 */
        'ip_count': 1
        /**贡献浏览量 */
        'out_pv_count': 1
        /**跳出率，% */
        'bounce_ratio': 1
        /**平均访问时长，秒 */
        'avg_visit_time': 1
        /**平均访问页数 */
        'avg_visit_pages': 1
        /**转化次数 */
        'trans_count': 1
        /**转化率，%) */
        'trans_ratio': 1
      }>
      /**
       * 受访域名	
       */
      'visit/topdomain/a': Partial<{
        /**(浏览量(PV)) */
        'pv_count': 1
        /**(浏览量占比，%) */
        'pv_ratio': 1
        /**(访问次数) */
        'visit_count': 1
        /**(访客数(UV)) */
        'visitor_count': 1
        /**(新访客数) */
        'new_visitor_count': 1
        /**(新访客比率，%) */
        'new_visitor_ratio': 1
        /**(IP数) */
        'ip_count': 1
        /**(跳出率，%) */
        'bounce_ratio': 1
        /**(平均停留时长，秒) */
        'average_stay_time': 1
        /**(平 */
        'avg_visit_pages': 1
      }>
      /**
       * 地域分布	(按省)
       */
      'visit/district/a': Partial<{
        /**(浏览量(PV)) pv_ratio(浏览量占比，%) */
        'pv_count': 1
        /**(访问次数) */
        'visit_count': 1
        /**(访客数(UV)) */
        'visitor_count': 1
        /**(新访客数) */
        'new_visitor_count': 1
        /**(新访客比率，%) */
        'new_visitor_ratio': 1
        /**(IP数) */
        'ip_count': 1
        /**(跳出率，%) */
        'bounce_ratio': 1
        /**(平均访问时长，秒) */
        'avg_visit_time': 1
        /**(source visitor平均访问页数) */
        'avg_visit_pages': 1
        /**(转化次数) */
        'trans_count': 1
        /**(转化率，%) */
        'trans_ratio': 1
      }&{ visitor:1,source:1 }>
      /**
       * 地域分布	(按国家)
       */
      'visit/world/a': report_params['visit/district/a']
      'custom/event_track/a': Partial<{
        /**(事件总数) */
        'event_count': 1
        /**(唯一访客事件数) */
        'uniq_event_count': 1
        /**(事件价值，元) */
        'event_value': 1
        /**(平均价值，元) */
        'avg_event_value': 1
      } & {
        /**类别 */
        'flag:category': 1
        /**操作 */
        'flag:action': 1
        /**标签 */
        'flag:label': 1
      }>
      'custom/visit/a': Partial<{
        /**浏览量(PV) */
        'pv_count': 1 
        /**访问次数 */
        'visit_count': 1 
        /**访客数(UV) */
        'visitor_count': 1 
        /**新访客数 */
        'new_visitor_count': 1 
        /**新访客比率，% */
        'new_visitor_ratio': 1 
        /**平均访问页数 */
        'avg_visit_pages': 1 
        /**平均访问时长，秒 */
        'avg_visit_time': 1 
        /**跳出率，% */
        'bounce_ratio': 1 
      } & {
        /**访客类型1 */
        'flag:index1': 1
        /**访客类型2 */
        'flag:index2': 2
        /**访客类型3 */
        'flag:index3': 3
        /**访客类型4 */
        'flag:index4': 4
        /**访客类型5 */
        'flag:index5': 5
      }>
    }
    type query_params_keys = keyof report_params
    type query_params<T extends query_params_keys> = base_params & Partial<filter_params> & { method: T, metrics: report_params[T] }
    interface SiteFormat {
      /**指标列表 */
      fields: string[]
      /**总计数据 */
      sum: string[]
      /**
       * 	指标数据，有4部分构成：
       * - `0` 维度数据
       * - `1` 指标数据
       * - `2` 对比时间段数据
       * - `3` 变化率数据
       */
      items: any[][]
      /**总计条目 */
      total: number
    }
    interface Resp<T> {
      header: {
        status: 0
        succ: 1|0,
        desc: "success"|"failure"
        failures: string[]
        oprs: 1,
        oprtime: 0,
        quota: number,
        rquota: number,
      }
      body: {
        data: [T]
      }
    }
  }
}
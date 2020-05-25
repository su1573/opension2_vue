<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header
      :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth"
    >
      <div slot="header-left">
        <slot name="fc-header-left" />
      </div>
      <div slot="header-right">
        <slot name="fc-header-right" />
      </div>
    </fc-header>
    <!-- body display date day and events -->
    <div class="full-calendar-body">
      <div class="weeks">
        <strong
          v-for="(dayIndex, index) in 7"
          :key="dayIndex + index + '_' + 2"
          class="week"
          >{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong
        >
      </div>
      <div ref="dates" class="dates">
        <div class="dates-bg">
          <div
            v-for="(week, index) in currentDates"
            :key="week + '_' + index"
            class="week-row"
          >
            <div
              v-for="(day, index) in week"
              :key="day + '_' + index"
              :class="{ today: day.isToday, 'not-cur-month': !day.isCurMonth }"
              class="day-cell"
            >
              <p class="day-number">{{ day.monthDay }}</p>
            </div>
          </div>
        </div>
        <!-- absolute so we can make dynamic td -->
        <div class="dates-events">
          <div
            v-for="(week, index) in currentDates"
            :key="week + '_' + index"
            class="events-week"
          >
            <div
              v-for="(day, index) in week"
              :key="day + '_' + index"
              :class="{ today: day.isToday, 'not-cur-month': !day.isCurMonth }"
              class="events-day"
              track-by="$index"
              @click.stop="dayClick(day.date, $event)"
            >
              <p class="day-number">{{ day.monthDay }}</p>
              <div class="event-box">
                <event-card
                  v-for="(event, index) in day.events"
                  v-show="event.cellIndex <= eventLimit"
                  :event="event"
                  :date="day.date"
                  :first-day="firstDay"
                  :key="event + '__' + index"
                  @click="eventClick"
                >
                  <template slot-scope="p">
                    <slot :event="p.event" name="fc-event-card" />
                  </template>
                </event-card>
                <p
                  v-if="day.events.length > eventLimit"
                  class="more-link"
                  @click.stop="selectThisDay(day, $event)"
                >
                  +
                  {{ day.events[day.events.length - 1].cellIndex - eventLimit }}
                  more
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- full events when click show more -->
        <div
          v-show="showMore"
          :style="{ left: morePos.left + 'px', top: morePos.top + 'px' }"
          class="more-events"
        >
          <div class="more-header">
            <span class="title">{{ moreTitle(selectDay.date) }}</span>
            <span class="close" @click.stop="showMore = false">x</span>
          </div>
          <div class="more-body">
            <ul class="body-list">
              <li
                v-for="(event, index) in selectDay.events"
                v-show="event.isShow"
                :key="event + '_' + index"
                :class="event.cssClass"
                class="body-item"
                @click="eventClick(event, $event)"
              >
                {{ event.title }}
              </li>
            </ul>
          </div>
        </div>
        <div
          v-show="showMore__card"
          ref="showMore__card"
          :style="{
            left: morePos__card.left + 'px',
            top: morePos__card.top + 'px'
          }"
          class="el-popover showMore__card"
        >
          <div class="el-popover__title">{{ showMore__card__info.title }}</div>
          <div v-html="showMore__card__info.content" />
          <div class="btnGroup text-right">
            <el-button
              size="mini"
              type="primary"
              @click="showMore__card = false"
              >确定</el-button
            >
          </div>
        </div>
        <slot name="body-card" />
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
// import langSets from './dataMap/langSets'
import dateFunc from "./components/dateFunc";
import moment from "moment"; // 日期格式化插件
import EventCard from "./components/eventCard.vue";
import header from "./components/header.vue";

export default {
  components: {
    "event-card": EventCard,
    "fc-header": header
  },
  filters: {
    localeWeekDay(weekday, firstDay, locale) {
      firstDay = parseInt(firstDay);
      const localMoment = moment().locale(locale);
      return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
    }
  },
  props: {
    events: {
      // events will be displayed on calendar
      type: Array,
      default: function() {}
    },
    locale: {
      type: String,
      default: "en"
    },
    firstDay: {
      type: Number | String,
      validator(val) {
        const res = parseInt(val);
        return res >= 0 && res <= 6;
      },
      default: 0
    }
  },
  data() {
    return {
      currentMonth: moment().startOf("month"),
      isLismit: true,
      eventLimit: 3,
      showMore: false,
      showMore__card: false,
      showMore__card__info: "",
      morePos: {
        top: 0,
        left: 0
      },
      morePos__card: {
        top: 0,
        left: 0
      },
      selectDay: {}
    };
  },
  computed: {
    currentDates() {
      return this.getCalendar();
    }
  },
  mounted() {
    this.emitChangeMonth(this.currentMonth);
  },
  methods: {
    emitChangeMonth(firstDayOfMonth) {
      this.currentMonth = firstDayOfMonth;

      const start = dateFunc.getMonthViewStartDate(
        firstDayOfMonth,
        this.firstDay
      );
      const end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

      this.$emit("changeMonth", start, end, firstDayOfMonth);
    },
    moreTitle(date) {
      if (!date) return "";
      return moment(date).format("ll");
    },
    getCalendar() {
      // calculate 2d-array of each month
      const monthViewStartDate = dateFunc.getMonthViewStartDate(
        this.currentMonth,
        this.firstDay
      );
      const calendar = [];

      for (let perWeek = 0; perWeek < 6; perWeek++) {
        const week = [];

        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: monthViewStartDate.date(),
            isToday: monthViewStartDate.isSame(moment(), "day"),
            isCurMonth: monthViewStartDate.isSame(this.currentMonth, "month"),
            weekDay: perDay,
            date: moment(monthViewStartDate),
            events: this.slotEvents(monthViewStartDate)
          });

          monthViewStartDate.add(1, "day");
        }

        calendar.push(week);
      }

      return calendar;
    },
    slotEvents(date) {
      // find all events start from this date
      // const cellIndexArr = []
      const thisDayEvents = this.events.filter(day => {
        const st = moment(day.start);
        const ed = moment(day.end ? day.end : st);

        return date.isBetween(st, ed, null, "[]");
      });

      // sort by duration
      thisDayEvents.sort((a, b) => {
        if (!a.cellIndex) return 1;
        if (!b.cellIndex) return -1;
        return a.cellIndex - b.cellIndex;
      });

      // mark cellIndex and place holder
      for (let i = 0; i < thisDayEvents.length; i++) {
        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
        thisDayEvents[i].isShow = true;
        if (thisDayEvents[i].cellIndex === i + 1 || i > 2) continue;
        thisDayEvents.splice(i, 0, {
          title: "holder",
          cellIndex: i + 1,
          start: date.format(),
          end: date.format(),
          isShow: false
        });
      }

      return thisDayEvents;
    },
    selectThisDay(day, jsEvent) {
      this.selectDay = day;

      this.showMore = true;
      this.morePos = this.computePos(event.target);
      this.morePos.top -= 100;
      this.morePos__card.left += 80;

      const events = day.events.filter(item => {
        return item.isShow === true;
      });
      this.$emit("moreClick", day.date, events, jsEvent);
    },
    computePos(target) {
      const eventRect = target.getBoundingClientRect();
      const pageRect = this.$refs.dates.getBoundingClientRect();
      //console.log(target);
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top
      };
    },
    dayClick(day, jsEvent) {
      this.$emit("dayClick", day, jsEvent);
    },
    eventClick(event, jsEvent) {
      if (!event.isShow) return;

      jsEvent.stopPropagation();
      const pos = this.computePos(jsEvent.target);
      this.$emit("eventClick", event, jsEvent, pos);
      this.showMore_card_fun(event, jsEvent);
    },
    showMore_card_fun(event, jsEvent) {
      this.showMore__card = true;
      this.showMore__card__info = event;

      // console.log(this.$refs.showMore__card.offsetTop)

      this.morePos__card = this.computePos(jsEvent.target);
      this.morePos__card.top -= 50;
      this.morePos__card.left += 80;
    }
  }
};
</script>
<style lang="scss">
@import "./style.scss";
</style>

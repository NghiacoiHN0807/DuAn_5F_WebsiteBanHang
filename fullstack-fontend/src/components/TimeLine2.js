import React, { useRef, useState, useEffect } from "react";
import {
  FaBug,
  FaCogs,
  FaPaperPlane,
  FaRegCalendarCheck,
  FaRegCheckCircle,
  FaRegFileAlt,
} from "react-icons/fa";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Timeline from "../MappingTimeLine/Timeline";
import TimelineEvent from "../MappingTimeLine/TimelineEvent";

const styles = {
  container: {
    marginTop: 16,
  },
};

const Timeline2 = ({ classes }) => {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(2); // Initialize activeIndex state with 0

  useEffect(() => {
    console.log("Active Index:", activeIndex); // Log the updated value of activeIndex
  }, [activeIndex]);

  const handleNextButtonClick = () => {
    if (timelineRef.current) {
      timelineRef.current.goToNextEvent();
      setActiveIndex((prevIndex) => prevIndex + 1); // Increment activeIndex when next button is clicked
    }
  };

  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item xs={12}>
        <Timeline minEvents={7} placeholder>
          <TimelineEvent
            icon={FaRegFileAlt}
            title="Em rascunho"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color={activeIndex === 1 ? "#87a2c7" : "primary"}
            icon={FaRegCalendarCheck}
            title="Agendado"
            subtitle="26/03/2019 09:51"
            action={{
              label: "Ver detalhes...",
              onClick: () => console.log("test"),
            }}
          />
          <TimelineEvent
            color={activeIndex === 2 ? "#ffcc00" : "primary"}
            icon={FaCogs}
            title="Processando"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color={activeIndex === 3 ? "primary" : "#9c2919"}
            icon={FaBug}
            title="Erro"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color={activeIndex === 4 ? "primary" : "#3865a3"}
            icon={FaPaperPlane}
            title="Enviando"
            subtitle="26/03/2019 09:51"
          />
          <TimelineEvent
            color={activeIndex === 5 ? "primary" : "#64a338"}
            icon={FaRegCheckCircle}
            title="Concluído"
            subtitle="26/03/2019 09:51"
          />
        </Timeline>
        <button onClick={handleNextButtonClick} title="Next Event">
          Next Event
        </button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Timeline2);

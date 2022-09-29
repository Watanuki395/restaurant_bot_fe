//import "./widget.scss";
import { Container, Section } from '../../styles/globalStyles';
import { useEffect, useState } from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import {
  WidgetText,
	WidgetTitle,
	WidgetWrapper,
	WidgetColumn,
	WidgetIconWrapper,
	WidgetName,
	WidgetTextWrapper,
  WidgetCounter,
  WidgetLink,
  WidgetPercentage,
  WidgetContent
} from "./styles";

import {widgetData} from "./data"

//import { collection, query, where, getDocs } from "firebase/firestore";
//import { db } from "../../firebase";

const Widget = ({ type, reverse, inverse }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const today = new Date();
  //     const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
  //     const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

  //     const lastMonthQuery = query(
  //       collection(db, data.query),
  //       where("timeStamp", "<=", today),
  //       where("timeStamp", ">", lastMonth)
  //     );
  //     const prevMonthQuery = query(
  //       collection(db, data.query),
  //       where("timeStamp", "<=", lastMonth),
  //       where("timeStamp", ">", prevMonth)
  //     );

  //     const lastMonthData = await getDocs(lastMonthQuery);
  //     const prevMonthData = await getDocs(prevMonthQuery);

  //     setAmount(lastMonthData.docs.length);
  //     setDiff(
  //       ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
  //         100
  //     );
  //   };
  //   fetchData();
  // }, []);

  return (
    <Section smPadding="50px 10px" inverse id="widget">
      <Container>
            <WidgetWrapper>
            {widgetData.map((item) => (
              <WidgetColumn>
                <WidgetContent>
                <WidgetName>{item.name}</WidgetName>
                  <WidgetCounter>
                    {item.isMoney && "$"} {amount?amount:0}
                  </WidgetCounter>
                  <WidgetLink>{item.link}</WidgetLink>
                </WidgetContent>
                <WidgetContent>
                <WidgetPercentage perc={diff}>
                    {diff < 0 ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                    {diff} %
                  </WidgetPercentage>
                  <WidgetIconWrapper  className={item.imgClass}>{item.icon}</WidgetIconWrapper>
                </WidgetContent>
              </WidgetColumn>
            ))}
            </WidgetWrapper>
      </Container>
    </Section>
  );
};

export default Widget;

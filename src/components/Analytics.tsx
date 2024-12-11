import React from "react";
import { registerables, Chart as ChartJS } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AnalyticsProps {
  data: any;
  loading: boolean;
  botId: number;
}

const Analytics: React.FC<AnalyticsProps> = ({}) => {
  const [modal, setModal] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());

  const dateSelections = [
    {
      label: "Today",
      value: "1",
    },
    {
      label: "Yesterday",
      type: "from-to-number",
      value: "2 - 2",
    },
    {
      label: "This week",
      type: "week",
      value: "this-week",
    },
    {
      label: "Last week",
      type: "week",
      value: "last-week",
    },
    {
      label: "Last 7 days",
      value: "7",
    },
    {
      label: "Last 30 days",
      value: "30",
    },
    {
      label: "Last 90 days",
      value: "90",
    },
    {
      label: "Last 12 months",
      value: "360",
    },
    {
      label: "This Calendar Year (Jan - Today)",
      type: "from",
      value: "Jan 1",
    },
    {
      label: "Custom",
      type: "custom",
    },
  ];

  ChartJS.register(...registerables);
  return (
    <div className="bg-white h-[calc(100vh-96px)] w-full m-4 rounded-2xl overflow-x-auto">
      <div className="rounded-t-2xl bg-secondary p-8">
        <div className="flex justify-between">
          <h1 className="text-white  text-4xl mr-4 font-semibold">Test Bot</h1>
          <p className="text-black rounded-full p-2 px-4 bg-slate-200">
            Supervised Plan
          </p>
        </div>

        <p
          className="text-slate-300 mt-8 font-semibold text-xl underline"
          onClick={() => {
            setModal(true);
          }}
        >
          Last 30 days &gt;
        </p>
      </div>
      <div className="p-8 pt-4">
        <div className="md:flex justify-between p-4 max-w-2xl mx-auto">
          <div className="text-center p-4">
            <p className="text-primary font-semibold text-6xl">2667</p>
            <p className="text-light text-md mt-2">
              Unique visitors in last 30 days
            </p>
          </div>
          <div className="text-center p-4">
            <p className="text-primary font-semibold text-6xl">3588</p>
            <p className="text-light text-md mt-2">
              Total messages in last 30 days
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-8 mx-auto max-w-2xl">
        <Bar
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Messages",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "#a437db",
              },
            ],
          }}
          color="#"
        />
        <div className="mt-16">
          <Bar
            className="mt-2"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Unique Visitors",
                  data: [1, 4, 3, 2, 1, 2],
                  backgroundColor: "#6849f8",
                },
              ],
            }}
            color="#"
          />
        </div>
      </div>
      {modal && (
        <div className="absolute z-10 top-0 left-0 h-screen overflow-hidden w-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex rounded-xl bg-white lg:w-">
            <div className="w-96">
              {dateSelections.map((date, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between p-4 border-b border-slate-200"
                  >
                    <p className="text-slate-800">{date.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="w-full p-4 lg:p-8">
                <h3 className="text-3xl mb-8 text-center">Date</h3>
                <div className="flex justify-center ">
                  <div className="mr-2 mb-8">
                    <DatePicker
                      className="border border-slate-200 rounded-xl p-2 w-44 mr-2"
                      selected={startDate}
                      onChange={(date) => setStartDate(date as Date)}
                    />
                  </div>
                  <div className="mb-8">
                    <DatePicker
                      className="border border-slate-200 rounded-xl p-2 w-44"
                      selected={startDate}
                      onChange={(date) => setStartDate(date as Date)}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Calendar
                    className="rounded-2xl border-slate-200 w-full"
                    value={new Date()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;

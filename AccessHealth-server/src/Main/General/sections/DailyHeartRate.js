import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import moment from 'moment';
import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';
import reverse from 'lodash/reverse';
import css from './styles.css';
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
} from 'recharts';
import CustomTooltip from '../../../components/Tooltip';

class DailyHeartRate extends Component {
  static propTypes = {
    data: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
    today: PropTypes.bool,
  }

  normalizeData(entries) {
    const normalizedData = [];

    forEach(entries, (entry, i) => {
      if (normalizedData.length === 0 || i === entries.length) {
        normalizedData.push(entry);
      } else {
        const datea =
          moment(entry.startDate);
        const dateb =
          moment(normalizedData[normalizedData.length - 1].startDate);
        if ((datea - dateb) / 1000 > 60) {
          normalizedData.push({ startDate: moment(entry.startDate).toDate().getTime(), value: entry.value });
        }
      }
    });
    return normalizedData;
  }

  render() {
    const {
      data,
      today,
      min,
      max,
    } = this.props;
    const copiedData = cloneDeep(data);
    const hrData = this.normalizeData(reverse(copiedData));

    return (
      <div className={`${css.card} ${css.heartCard}`}>
        <div className={css.graphWrapper}>
          <div>
            <LineChart
              width={350}
              height={120}
              data={hrData}
              margin={{ left: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF4A6F" />
                  <stop offset="25%" stopColor="#FF4A6F" />
                  <stop offset="50%" stopColor="#FF4A6F" />
                  <stop offset="100%" stopColor="#FCA9BF" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="value"
                stroke='url(#colorUv)'
                strokeWidth="3"
                dot={false}
                unit="bpm"
              />
              <XAxis
                scale="time"
                type="number"
                dataKey="startDate"
                axisLine={false}
                tick={false}
                tickLine={false}
                domain={['dataMin', 'dataMax']}
              />
              <Tooltip content={<CustomTooltip />} />
              <YAxis
                unit="bpm"
                type="number"
                domain={[30, 200]}
                axisLine={false}
                tick={false}
                tickLine={false}
              />
            </LineChart>
          </div>
        </div>
        <div className={css.hrDataRow}>
          { today ?
          (
            <div className={css.hrDataItem}>
              {
                `${data.length > 0 ? data[data.length - 1].value : 0}
                bpm `
              }
              <div className={css.dataLabel}>Heart Rate</div>
            </div>
            ) : null
          }
          <div className={css.hrDataItem}>
            {min || 0} bpm
            <div className={css.dataLabel}>Min. Heart Rate</div>
          </div>
          <div className={css.hrDataItem}>
            {max || 0} bpm
            <div className={css.dataLabel}>Max. Heart Rate</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyHeartRate;

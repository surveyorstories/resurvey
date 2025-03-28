import React from 'react'
import { officerDesignations } from './FormSection'
import { districts } from '../data/districts'
import { decodeHTMLEntities } from '../lib/sanitize'

interface NoticeData {
  khataNo: string
  rows: string[][]
  mapping: Record<string, number>
  fields: { en: string; te: string }[]
}

interface PrintableNoticeProps {
  districtName: string
  mandalName: string
  villageName: string
  startDate: string
  startTime: string
  notificationNumber: string
  notificationDate: string
  printedDate: string
  notices: NoticeData[]
  showHeaderOnWeb?: boolean
  noticeType: string
  officerName?: string
  officerDesignation?: string
}

const formatTime = (timeString: string): string => {
  if (!timeString) return ''

  try {
    const [hours, minutes] = timeString.split(':')
    const time = new Date()
    time.setHours(parseInt(hours))
    time.setMinutes(parseInt(minutes))
    return time.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  } catch (error) {
    return timeString
  }
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)
    // Format as dd-mm-yyyy
    return date
      .toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      .replace(/\//g, '-')
  } catch (error) {
    return dateString
  }
}

const PrintableNotice: React.FC<PrintableNoticeProps> = ({
  districtName,
  mandalName,
  villageName,
  startDate,
  startTime,
  notificationNumber,
  notificationDate,
  printedDate,
  notices,
  showHeaderOnWeb = true,
  noticeType,
  officerName,
  officerDesignation
}) => {
  const formattedTime = formatTime(startTime)
  const formattedDate = formatDate(startDate)
  const formattedNotificationDate = formatDate(notificationDate)
  const formattedPrintedDate = formatDate(printedDate)

  return (
    <div className='ground-truth-notice w-full max-w-full overflow-hidden'>
      {notices.map((notice, noticeIndex) => (
        <div key={`notice-${noticeIndex}`} className='khata-group w-full'>
          {/* Telugu header - only visible in print view, hidden in web view if showHeaderOnWeb is false */}
          <div
            className={`telugu-header-print telugu-text ${!showHeaderOnWeb ? 'hidden-on-web' : ''}`}
          >
            {/* print page */}
            {noticeType === 'GT Notice' ? (
              <>
                <h3 className='telugu-text'>ఫారం-15</h3>
                <h3 className='telugu-text'>భూ యాజమాన్య దారులకు నోటీసు</h3>
                <h3 className='telugu-text'>FOR GROUND TRUTHING</h3>
                <p
                  className='text-justify'
                  style={{ textAlign: 'justify', wordBreak: 'break-all' }}
                >
                  1) సర్వే సహాయక సంచాలకులు వారి 6(1) నోటిఫికేషన్ ఆర్‌.సి నెం{' '}
                  {notificationNumber || '________________'} తేది:{' '}
                  {formatDate(notificationDate) || '____________'}, అనుసరించి,{' '}
                  {districts.find((d) => d.value === districtName)?.te || '____________________'}{' '}
                  జిల్లా,
                  {mandalName || '_____________________'} మండలం,{' '}
                  {villageName || '____________________'} గ్రామములో సీమానిర్ణయం (demarcation) మరియు
                  సర్వే పనులు
                  {formattedDate || '_____________'} తేదీన {formattedTime || '________'} గం.ని.లకు
                  ప్రారంభిచబడును అని తెలియజేయడమైనది.
                  <br />
                  2) సర్వే మరియు సరిహద్దుల చట్టం, 1923లోని నియమ నిబంధనలు అనుసరించి సర్వే సమయం నందు ఈ
                  క్రింది షెడ్యూల్ లోని భూ యజమానులు భూమి వద్ద హాజరై మీ పొలము యొక్క సరిహద్దులను
                  చూపించి, తగిన సమాచారం మరియు అవసరమైన సహాయ సహకారములు అందించవలసినదిగా తెలియజేయడమైనది.
                </p>
              </>
            ) : (
              <>
                <h3 className='telugu-text'>ఫారం - 26</h3>
                <h3 className='telugu-text'>
                  ప్రైవేట్ భూముల/ప్రభుత్వా విభాగాలు/ సంస్థల భూ కమత ధ్రువీకరణ విచారణ కై నోటీసు
                </h3>
                <p
                  className='text-justify'
                  style={{ textAlign: 'justify', wordBreak: 'break-all' }}
                >
                  1) సహాయ సంచాలకులు, సర్వే మరియు భూమి రికార్డ్ల వారు జారీ చేసిన 6 (1) నోటిఫికేషన్
                  ఆర్‌.సి నెం {notificationNumber || '_______________'} తేది:{' '}
                  {formatDate(notificationDate) || '____________'} మరియు ఆంధ్రప్రదేశ్ సర్వే మరియు
                  సరిహద్దుల చట్టం, 1923 కు సంబంధించి{' '}
                  {districts.find((d) => d.value === districtName)?.te || '____________________'}{' '}
                  జిల్లా, {mandalName || '_____________________'} మండలం,{' '}
                  {villageName || '____________________'} గ్రామం యొక్క ప్రాథమిక సర్వే రికార్డులు
                  తయారుచేయడం జరిగినది. ప్రాథమిక సర్వే రికార్డులలో మీరు అభ్యంతరం తెలియచేసినందు భూమి
                  ధ్రువీకరణ (Ground Validation) నిమిత్తం తేది {formattedDate || '____________'} న{' '}
                  {formattedTime || '________'} గం. ని.లకు సర్వే పనులు ప్రారంభించబడును అని
                  తెలియచేయటమైనది.
                  <br />
                  2) సర్వే మరియు సరిహద్దుల చట్టం, 1923 లోని నియమ నిబంధనలు అనుసరించి సర్వే సమయం నందు
                  ఈ క్రింది షెడ్యూల్ లోని భూ యజమానులు భూమి వద్ద హాజరై మీ పొలము యొక్క సరిహద్దులను
                  చూపించి, తగిన సమాచారం మరియు అవసరమైన సహాయ సహకారములు అందించవలసినదిగా తెలియజేయడమైనది.
                </p>
              </>
            )}
          </div>

          <div className='table-container table w-full overflow-x-auto'>
            <table className='khata-table mt-4 w-full border-collapse'>
              <thead>
                <tr>
                  {notice.fields
                    .filter((field) => noticeType === 'GV Notice' || field.en !== 'LPM Number')
                    .map((field, i) => (
                      <th
                        key={`header-${i}`}
                        className='font-gautami border border-black p-2 text-center'
                      >
                        {field.te}
                      </th>
                    ))}
                  <th className='font-gautami border border-black p-2 text-center'>సంతకం</th>
                </tr>
              </thead>
              <tbody>
                {notice.rows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {notice.fields
                      .filter((field) => noticeType === 'GV Notice' || field.en !== 'LPM Number')
                      .map((field, colIndex) => (
                        <td
                          key={`cell-${rowIndex}-${colIndex}`}
                          className='font-gautami border border-black p-2 text-center'
                        >
                          {decodeHTMLEntities(row[notice.mapping[field.en]]) || ''}
                        </td>
                      ))}
                    <td className='font-gautami w-[160px] border border-black p-2'>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              className={`thirdpoint-print telugu-text ${!showHeaderOnWeb ? 'hidden-on-web' : ''}`}
            >
              3) నోటీసు యొక్క ప్రతిని సంతకం చేసి తిరిగి పంపించవలెను
            </p>
          </div>

          <div className='page-footer'>
            <div className='footer-signature-row'>
              <div className='left-column'>
                <p className='body-footer-text telugu-text'>
                  స్థలం: {villageName || '_____________'}
                </p>
                <p className='body-footer-text telugu-text'>
                  తేది: {formattedPrintedDate || '_____________'}
                </p>
              </div>
              {noticeType === 'GT Notice' ? (
                <div className='right-column' style={{ paddingLeft: '2.2rem', width: '200px' }}>
                  <p className='body-footer-text telugu-text text-right'>గ్రామ సర్వేయర్ సంతకం</p>
                </div>
              ) : (
                <div className='right-column'>
                  <p className='body-footer-text telugu-text text-right'>సంతకం:</p>
                  <p className='body-footer-text telugu-text text-right'>
                    పేరు: {officerName || '_______________'}
                  </p>
                  <p className='body-footer-text telugu-text text-right'>
                    హోదా/వృత్తి:{' '}
                    {officerDesignation
                      ? officerDesignations.find((d) => d.value === officerDesignation)?.te ||
                        officerDesignation
                      : '_______________'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PrintableNotice

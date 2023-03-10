import { Button } from 'react-bootstrap';
import { VBox } from '../../components/layout';

export const CitySearchSuggestions = ({ citySuggestions, onClick }) => {
  return (
    <VBox
      styles={{
        position: 'absolute',
        background: 'rgba(33, 37, 41)',
        border: 'none',
        borderRadius: '6px',
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
      }}>
      {citySuggestions.map((citySuggestion, i) => (
        <>
          <Button
            as="div"
            className="suggestionButton"
            style={{
              background: 'rgba(33, 37, 41)',
              border: 'none',
              borderTopLeftRadius: i === 0 ? '6px' : '0px',
              borderTopRightRadius: i === 0 ? '6px' : '0px',
              borderBottomLeftRadius: citySuggestions.length - 1 === i ? '6px' : '0px',
              borderBottomRightRadius: citySuggestions.length - 1 === i ? '6px' : '0px',
              display: 'flex',
              width: '100%',
              padding: '5px 15px',
              flexDirection: 'column',
              textAlign: 'start',
              paddingTop: i === 0 ? '10px' : undefined,
              paddingBottom: citySuggestions.length - 1 === i ? '10px' : undefined
            }}
            key={citySuggestion.addressLine2 + i}
            // TODO: add lat, lon support
            onClick={onClick(citySuggestion.lat, citySuggestion.lon, citySuggestion.cityName)}>
            <span style={{ fontWeight: 'bold' }}>{citySuggestion.addressLine1}</span>
            <span style={{ color: 'white', fontSize: '12px' }}>{citySuggestion.addressLine2}</span>
          </Button>
          {citySuggestions.length - 1 !== i && <hr style={{ margin: 0 }} />}
        </>
      ))}
    </VBox>
  );
};

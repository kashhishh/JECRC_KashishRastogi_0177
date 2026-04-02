import { useOutletContext } from 'react-router-dom';
import './Products.css';

const Specs = () => {
  const context = useOutletContext();
  const productName = context?.productName || 'This Product';

  const specifications = {
    'Material': 'Premium Grade Plastic & Metal',
    'Weight': '280g',
    'Dimensions': '200mm x 150mm x 80mm',
    'Color Options': 'Black, Silver, Gold',
    'Warranty': '2 Years',
    'Battery Life': '32 Hours (on single charge)',
    'Connectivity': 'Bluetooth 5.0, USB-C',
    'Compatibility': 'iOS & Android',
    'Water Resistance': 'IPX5 (Splash proof)',
    'Certifications': 'CE, FCC, RoHS'
  };

  return (
    <div className="specs-section">
      <h2>Product Specifications</h2>

      <table className="specs-table">
        <tbody>
          {Object.entries(specifications).map(([key, value]) => (
            <tr key={key}>
              <td className="spec-key">{key}</td>
              <td className="spec-value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="specs-notes">
        <h3>Important Notes</h3>
        <ul>
          <li>All products are tested before shipping</li>
          <li>Packaging includes original accessories</li>
          <li>30-day money-back guarantee</li>
          <li>International warranty support available</li>
        </ul>
      </div>
    </div>
  );
};

export default Specs;

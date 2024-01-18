import { expect } from "chai";
import nock from "nock";
import axios from "axios";

const baseUrl = 'http://localhost:8888/api/v1';

describe("API Testing", () => {
  it('should make a POST request from API', async () => {
    const dataUpload = `{
        "accountant_name": "nhung",
        "warehouseman_name": "long",
        "deliver_name": "tungf",
        "creator_name": "tú",
        "warehouses_id": 1,
        "delivering_party_id": 2,
        "receiving_party_id": 1,
        "invoice_id": 2,
        "form": 1,
        "have": 32,
        "owe": 43,
        "code": "DL-99"
      }`;

    // Mock the POST request without actually sending it
    nock(baseUrl)
      .post("/receipt", dataUpload)
      .reply(200, {
        message: "receipt get successfully",
        status: "success",
        data: {
          accountant_name: "nhung",
          warehouseman_name: "long",
          deliver_name: "tungf",
          creator_name: "tú",
          warehouses_id: 1,
          delivering_party_id: 2,
          receiving_party_id: 1,
          invoice_id: 2,
          form: 1,
          have: 32,
          owe: 43,
          code: "DL-99",
        }
      });

    // act
    const res = await axios.post(`${baseUrl}/receipt`, dataUpload);

    // assert
    expect(res.status).to.equal(200);

    expect(res.data).to.have.property('message').equal('receipt get successfully');
    expect(res.data).to.have.property('status').equal('success');
    expect(res.data).to.have.property('data').to.be.an('object');

    const responseData = res.data.data;
    expect(responseData.accountant_name).to.equal('nhung');
    expect(responseData.warehouseman_name).to.equal('long');

    expect(responseData).to.have.all.keys(
      'accountant_name',
      'warehouseman_name',
      'deliver_name',
      'creator_name',
      'warehouses_id',
      'delivering_party_id',
      'receiving_party_id',
      'invoice_id',
      'form',
      'have',
      'owe',
      'code'
    );
  });

  it('should handle errors properly', async () => {
    const errorData = {
      error: 'Invalid request',
      status: 'error',
    };
  
    // Mock the POST request to simulate an error
    nock(baseUrl)
      .post("/receipt")
      .reply(400, errorData);
  
    // act
    try {
      await axios.post(`${baseUrl}/receipt`);
    } catch (error: any) {
      // assert
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.deep.equal(errorData);
    }
  });

  after(() => {
    nock.cleanAll();
  });
});

import { apiRequest, } from 'utils/network';

class CampaignAPIService {
  fetchAllCampaigns = () => apiRequest('ad-campaigns');
  fetchCampaignDetails = (id) => apiRequest('ad-campaigns/' + id);
}

const CampaignService = new CampaignAPIService();

export default CampaignService;

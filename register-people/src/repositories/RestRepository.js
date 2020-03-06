import Client from "./client/AxiosClient";

const RestRepository = resource => {
  const get = () => {
    return Client.get(`${resource}`);
  };

  const getById = id => {
    return Client.get(`${resource}/${id}`);
  };

  const create = payload => {
    return Client.post(`${resource}`, payload);
  };

  const update = (payload, id) => {
    return Client.patch(`${resource}/${id}`, payload);
  };

  const remove = id => {
    return Client.delete(`${resource}/${id}`);
  };

  return {
    get,
    getById,
    create,
    update,
    remove
  };
};

export default RestRepository;

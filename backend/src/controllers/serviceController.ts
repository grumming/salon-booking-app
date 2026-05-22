import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, duration, price, category, image } = req.body;

    const service = new Service({
      name,
      description,
      duration,
      price,
      category,
      image
    });

    await service.save();
    res.status(201).json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

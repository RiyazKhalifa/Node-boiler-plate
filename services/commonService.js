const db = require('../models');
const { User, Faq, Role, Permission, Customer } = db;
const sequelize = db.sequelize;

const models = {
    user: User,
    faq: Faq,
    role: Role,
    permission: Permission,
    customer: Customer
};

class CommonService {
    static async updateStatus(module, id, status) {
        const Model = models[module];
        if (!Model) {
            throw { status: 400, message: 'errors.invalid_module' };
        }

        const entity = await Model.findByPk(id);
        if (!entity) {
            throw { status: 404, message: `errors.${module}_not_found` };
        }

        entity.status = status;
        await entity.save();

        return {};
    }

    static async deleteEntity(module, id) {
        const Model = models[module];
        if (!Model) {
            throw { status: 400, message: 'errors.invalid_module' };
        }

        const entity = await Model.findByPk(id);
        if (!entity) {
            throw { status: 404, message: `errors.${module}_not_found` };
        }

        await entity.destroy();
        return {};
    }

    static async adjustSequences(module, sequences) {
        const Model = models[module];
        if (!Model) {
            throw { status: 400, message: 'errors.invalid_module' };
        }

        const transaction = await sequelize.transaction();

        try {
            for (const { id, sequence } of sequences) {
                const entity = await Model.findByPk(id, { transaction });
                if (!entity) {
                    throw { status: 404, message: `errors.${module}_not_found` };
                }
                entity.sequence = sequence;
                await entity.save({ transaction });
            }
            await transaction.commit();
            return {};
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = CommonService;
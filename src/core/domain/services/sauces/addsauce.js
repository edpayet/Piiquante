import { Sauce } from '../../entities/Sauce';
import { Result } from '../../../../util/result';

export class AddSauce {
    constructor(sauceRepository) {
        if (!sauceRepository) {
            throw new Error('AddSauce requires a sauce repository');
        }
        this.sauceRepository = sauceRepository;
    }

    async execute(props) {
        try {
            if (!props) {
                return Result.failure(
                    new Error('AddSauce requires sauce data')
                );
            }
            const sauce = Sauce.create({ ...props });
            await this.sauceRepository.addSauce(sauce);
            return Result.success('Sauce added');
        } catch (error) {
            console.log(error);
            return Result.failure(error);
        }
    }
}
